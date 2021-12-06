import React from 'react'
import styled from 'styled-components'
import { PopupCustom } from '../Popup/PopupCustom'

interface Props {
  visible: boolean
  handleCancel: () => void
}

const STYLED_SHARE_PROFILE = styled(PopupCustom)`
  ${({ theme }) => `
    .ant-modal-body {
      padding: ${theme.margins['5x']} ${theme.margins['7x']};
    }
    .ant-modal-close {
      right: 35px;
      top: 35px;
      left: auto;
    }
    .title {
      font-family: Montserrat;
      font-size: 25px;
      font-weight: 600;
      color: #fff;
      margin-bottom: ${theme.margins['4x']};
    }
    .social-list {
      display: flex;
      align-item: center;
      margin: 0 -${theme.margins['2x']};
    }
    .social-item {
      padding: 0 ${theme.margins['2x']};
      img {
        cursor: pointer;
      }
    }
    .social-text {
      text-transform: capitalize;
      font-family: Montserrat;
      font-size: 17px;
      font-weight: 500;
      text-align: center;
      margin-top: 20px;
    }
  `}
`

export const ShareProfile = ({ visible, handleCancel }: Props) => {
  return (
    <STYLED_SHARE_PROFILE
      width="587px"
      height="310px"
      title={null}
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <h1 className="title">Share this porfile</h1>
      <div className="social-list">
        {['twitter', 'telegram', 'facebook', 'copy link'].map((item) => (
          <div className="social-item" key={item}>
            <div className="social-icon">
              <img src={`${process.env.PUBLIC_URL}/img/assets/${item.replace(' ', '-')}-circle.svg`} alt="" />
            </div>
            <div className="social-text">{item}</div>
          </div>
        ))}
      </div>
    </STYLED_SHARE_PROFILE>
  )
}
