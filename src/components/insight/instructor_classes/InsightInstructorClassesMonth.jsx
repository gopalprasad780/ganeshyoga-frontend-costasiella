import React, { useContext, useState } from 'react'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import { withTranslation } from 'react-i18next'
import { withRouter } from "react-router"
import { Formik } from 'formik'
import { v4 } from 'uuid'
import moment from 'moment'

import {
  Button,
  Card,
  Container,
  Dimmer,
  Icon,
  List,
  Page,
  Table
} from "tabler-react"


import { INSIGHT_INSTRUCTOR_CLASSES_SCHEMA } from './yupSchema'
import { GET_INSTRUCTORS_QUERY, GET_INSTRUCTORS_CLASSES_MONTH_CLASSES } from './queries'
import InsightInstructorClassesMonthBase from './InsightInstructorClassesMonthBase'
import InsightInstructorClassesForm from './InsightInstructorClassesForm';


function InsightInstructorClassesMonth({t, history}) {
  // const [prepared, setPrepared] = useState(false)
  const cardTitle = t("insight.instructor_classes_month.title")

  const { loading, error, data } = useQuery(GET_INSTRUCTORS_QUERY)
  const [ getInstructoClassesInMonth, { 
    called: calledReport, 
    loading: loadingReport, 
    error: errorReport, 
    data: dataReport, 
    refetch: refetchReport, 
    fetchMore: fetchMoreReport,
  } ] = useLazyQuery( GET_INSTRUCTORS_CLASSES_MONTH_CLASSES )

  if (loading) {
    return (
      <InsightInstructorClassesMonthBase>
        <Card title={cardTitle}>
          <Card.Body>
            <Dimmer active={true} loader={true} />
          </Card.Body>
        </Card>
      </InsightInstructorClassesMonthBase>
    )
  }

  if (error) {
    console.error(error)
    return (
      <InsightInstructorClassesMonthBase>
        <Card title={cardTitle}>
          <Card.Body>
            {t("general.error_sad_smiley")}
          </Card.Body>
        </Card>
      </InsightInstructorClassesMonthBase>
    )
  }  


  return (
    <InsightInstructorClassesMonthBase>
      <Card title={cardTitle}>
        <Formik
        initialValues={{ 
          year: moment().year(),
          month: moment().month(),
          instructor: ""
        }}
        validationSchema={INSIGHT_INSTRUCTOR_CLASSES_SCHEMA}
        onSubmit={(values, { setSubmitting }) => {
            console.log('submit values:')
            console.log(values)

            // execute lazy query to fetch classes for instructor
            getInstructoClassesInMonth({
              variables: { 
                year: values.year,
                month: values.month,
                instructor: values.instructor
              }
            })

            setSubmitting(false)
            // setPrepared(true)  
        }}
        >
        {({ isSubmitting, setFieldValue, setFieldTouched, errors, values, touched }) => (
          <InsightInstructorClassesForm
            inputData={data}
            isSubmitting={isSubmitting}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            errors={errors}
            values={values}
          />
          )
        }
      </Formik>
    </Card>
    {/* Prepared & loaded lazy query */}
    {(calledReport && dataReport) ? 
    // List instructor classes in this card
      <Card title={t("")}>
        {console.log(dataReport)}
        <Table cards>
          <Table.Header>
            <Table.Row key={v4()}>
              <Table.ColHeader>{t('general.date')}</Table.ColHeader>
              <Table.ColHeader>{t('general.time_start')}</Table.ColHeader>
              <Table.ColHeader>{t('general.class')}</Table.ColHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {dataReport.insightInstructorClassesMonth.classes.map(({ 
              date,
              timeStart
             }) => (
              <Table.Row key={v4()}>
                <Table.Col key={v4()}>
                  {date}
                </Table.Col>
                <Table.Col key={v4()}>
                  {timeStart}
                </Table.Col>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      : ""}
    </InsightInstructorClassesMonthBase>
  )
}

export default withTranslation()(withRouter(InsightInstructorClassesMonth))