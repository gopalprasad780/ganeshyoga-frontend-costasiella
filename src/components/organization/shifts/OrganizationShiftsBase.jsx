// @flow

import React from 'react'
import { withTranslation } from 'react-i18next'
import { withRouter } from "react-router"
import { Link } from "react-router-dom"

import {
  Page,
  Grid,
  Icon,
  Button,
  Container,
} from "tabler-react";
import SiteWrapper from "../../SiteWrapper"
import HasPermissionWrapper from "../../HasPermissionWrapper"

import OrganizationMenu from "../OrganizationMenu"


function OrganizationShiftsBase({t, history, children, showBack=false}) {
  return (
    <SiteWrapper>
      <div className="my-3 my-md-5">
        <Container>
          <Page.Header title={t("organization.title")} />
          <Grid.Row>
            <Grid.Col md={9}>
              {children}
            </Grid.Col>
            <Grid.Col md={3}>
              {(showBack) ?
                <Link to="/organization/shifts">
                  <Button color="primary btn-block mb-6">
                    <Icon prefix="fe" name="chevrons-left" /> {t('general.back')}
                  </Button>
                </Link>  
                :
                <HasPermissionWrapper permission="add"
                                      resource="organizationshift">
                  <Link to="/organization/shifts/add">
                    <Button color="primary btn-block mb-6">
                      <Icon prefix="fe" name="plus-circle" /> {t('organization.shifts.add')}
                    </Button>
                  </Link>
                </HasPermissionWrapper>
              }     
              <OrganizationMenu activeLink='shifts'/>
            </Grid.Col>
          </Grid.Row>
        </Container>
      </div>
    </SiteWrapper>
  )
}

export default withTranslation()(withRouter(OrganizationShiftsBase))