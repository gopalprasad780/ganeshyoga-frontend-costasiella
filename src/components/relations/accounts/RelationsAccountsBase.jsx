import React from 'react'
import { withTranslation } from 'react-i18next'
import { withRouter } from "react-router"

import {
  Page,
  Form,
  Grid,
  Icon,
  Button,
  Container,
} from "tabler-react";
import SiteWrapper from "../../SiteWrapper"
import HasPermissionWrapper from "../../HasPermissionWrapper"
import InputSearch from "../../general/InputSearch"

import CSLS from "../../../tools/cs_local_storage"
import { get_list_query_variables } from "./tools"


function RelationsAccountsBase({t, history, children, refetch}) {
  return (
    <SiteWrapper>
      <div className="my-3 my-md-5">
        <Container>
          <Page.Header title={t("relations.title")}>
            <div className="page-options d-flex">
              <InputSearch 
                initialValueKey={CSLS.RELATIONS_ACCOUNTS_SEARCH}
                placeholder="Search..."
                onChange={(value) => {
                  console.log(value)
                  localStorage.setItem(CSLS.RELATIONS_ACCOUNTS_SEARCH, value)
                  refetch(get_list_query_variables())
                }}
              />
              <Form.Select
                className="w-auto ml-2"
                onChange={(event) => {
                  console.log(event.target.value)
                  localStorage.setItem(CSLS.RELATIONS_ACCOUNTS_FILTER_TYPE, event.target.value)
                  console.log('fire refetch')
                  console.log(refetch(get_list_query_variables()))
                }}
              >
                <option value="">{t("general.all_accounts")}</option>
                <option value="customer">{t("general.customers")}</option>
                <option value="instructor">{t("general.instructors")}</option>
                <option value="employee">{t("general.employees")}</option>
              </Form.Select>
              <HasPermissionWrapper permission="add"
                                    resource="account">
                <Button color="primary ml-2"
                        onClick={() => history.push("/relations/accounts/add")}>
                  <Icon prefix="fe" name="plus-circle" /> {t('general.add')}
                </Button>
              </HasPermissionWrapper>
            </div>
          </Page.Header>
          <Grid.Row>
            <Grid.Col md={12}>
              {children}
            </Grid.Col>
          </Grid.Row>
        </Container>        
      </div>
    </SiteWrapper>
  )
}

export default withTranslation()(withRouter(RelationsAccountsBase))