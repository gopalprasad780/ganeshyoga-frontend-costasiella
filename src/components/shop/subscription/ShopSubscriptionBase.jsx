// @flow

import React from 'react'
import { withTranslation } from 'react-i18next'
import { withRouter } from "react-router"

import ShopBase from "../ShopBase"

function ShopSubscriptionBase({ t, match, history, children }) {
  
  return (
    <ShopBase 
      title={t("shop.title")}
      returnUrl="/shop/subscriptions"
      checkoutProgress="order"
    >
      {children}
    </ShopBase>
  )
}


export default withTranslation()(withRouter(ShopSubscriptionBase))