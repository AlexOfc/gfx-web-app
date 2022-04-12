import { Col, Row } from 'antd'
import { FC, useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useNFTDetails, useNFTProfile } from '../../../context'
import { ReactComponent as FixedPriceIcon } from '../../../assets/fixed-price.svg'
import { ReactComponent as OpenBidIcon } from '../../../assets/open-bid.svg'
import { Share } from '../Share'
import { SkeletonCommon } from '../Skeleton/SkeletonCommon'

//#region styles
const LEFT_SECTION = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: ${theme.text1};

    .ls-image {
      border-radius: 20px;
      box-shadow: 3px 3px 14px 0px rgb(0 0 0 / 43%);
    }

    .ls-bottom-panel {
      margin-top: ${theme.margin(2.5)};

      .ls-end-text {
        font-size: 12px;
        font-weight: 600;
        color: ${theme.text7};
      }

      .ls-favorite {
        margin-bottom: ${theme.margin(2)};
      }

      .ls-favorite-heart {
        width: 21px;
        height: 21px;
        margin-right: ${theme.margin(0.5)};
        cursor: pointer;
      }

      .ls-favorite-number {
        font-size: 18px;
        font-weight: 600;
        color: #4b4b4b;
      }

      .ls-favorite-number-highlight {
        color: ${theme.text1};
      }

      .ls-action-button {
        color: ${theme.text1};
      }
    }
  `}
`

const NFT_CONTAINER = styled.div`
  position: relative;
`

const SHARE_BUTTON = styled.button`
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: black;
  border: transparent;
  border-radius: 50%;
  padding: 0;
  cursor: pointer;

  &:hover {
    background-color: black;
  }

  img {
    &:hover {
      opacity: 0.8;
    }
  }
`
//#endregion

export const LeftSection: FC = ({ ...rest }) => {
  const { general, nftMetadata, totalLikes, ask } = useNFTDetails()
  const [isFavorited, setIsFavorited] = useState(false)
  const { sessionUser, likeDislike } = useNFTProfile()
  const [shareModal, setShareModal] = useState(false)
  const [likes, setLikes] = useState(totalLikes)

  //const hearts = 12
  const remaining = {
    days: '10',
    hours: '2',
    minutes: '43'
  }

  useEffect(() => {
    if (general && sessionUser) {
      setIsFavorited(sessionUser.user_likes.includes(general.non_fungible_id))
    }
  }, [sessionUser])

  const handleToggleLike = (e: any) => {
    if (sessionUser) {
      likeDislike(sessionUser.user_id, general.non_fungible_id).then((res) => {
        setLikes((prev) => (isFavorited ? prev - 1 : prev + 1))
      })
      setIsFavorited((prev) => !prev)
    }
  }

  const onShare = (social: string): void => {
    switch (social) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=Check%20out%20this%20item%20on%20Nest%20NFT%20Exchange&url=${window.location.host}${window.location.pathname}&via=gooseFX1&original_referer=${window.location.host}${window.location.pathname}`
        )
        break
      case 'telegram':
        window.open(
          `https://t.me/share/url?url=${window.location.host}${window.location.pathname}&text=Check%20out%20this%20item%20on%20Nest%20NFT%20Exchange`
        )
        break
      case 'facebook':
        window.open(`https://facebook.com`)
        break
      case 'copy link':
        copyToClipboard()
        break
      default:
        break
    }
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(window.location.href)
  }

  const handleModal = () => {
    if (shareModal) {
      return (
        <Share
          visible={shareModal}
          handleCancel={() => setShareModal(false)}
          socials={['twitter', 'telegram', 'facebook', 'copy link']}
          handleShare={onShare}
        />
      )
    } else {
      return false
    }
  }

  return general && nftMetadata ? (
    <LEFT_SECTION {...rest}>
      {handleModal()}
      <img className="ls-image" src={general?.image_url || nftMetadata?.image} alt="the-nft" />
      <NFT_CONTAINER>
        <SHARE_BUTTON onClick={(e) => setShareModal(true)}>
          <img src={`/img/assets/share.svg`} alt="share-icon" />
        </SHARE_BUTTON>
      </NFT_CONTAINER>
      <div className="ls-bottom-panel">
        <Row justify="space-between" align="middle">
          <Col>
            {ask ? <FixedPriceIcon className="ls-action-button" /> : <OpenBidIcon className="ls-action-button" />}
          </Col>
          <Col>
            {sessionUser && isFavorited ? (
              <img
                className="ls-favorite-heart"
                src={`/img/assets/heart-red.svg`}
                alt="heart-red"
                onClick={handleToggleLike}
              />
            ) : (
              <img
                className="ls-favorite-heart"
                src={`/img/assets/heart-empty.svg`}
                alt="heart-empty"
                onClick={handleToggleLike}
              />
            )}
            <span className={`ls-favorite-number ${isFavorited ? 'ls-favorite-number-highlight' : ''}`}>{likes}</span>
          </Col>
        </Row>
      </div>
    </LEFT_SECTION>
  ) : (
    <SkeletonCommon width="100%" height="500px" borderRadius="10px" />
  )
}
