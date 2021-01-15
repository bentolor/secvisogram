import React from 'react'
import View from '../../../lib/SecvisogramPage/View'

export const title = 'SecvisogramPage'

const props = {
  isLoading: false,
  isSaving: false,
  data: {
    doc: {
      acknowledgments: [
        {
          names: [''],
          organizations: [''],
          summary: '',
          urls: [''],
        },
      ],
    },
  },
  activeTab: /** @type {'EDITOR'} */ ('EDITOR'),
  onNew: console.log.bind(console, 'onNew'),
  onDownload: console.log.bind(console, 'onDownload'),
  onOpen: console.log.bind(console, 'onOpen'),
  onSave: console.log.bind(console, 'onSave'),
  onChangeTab: console.log.bind(console, 'onChangeTab'),
}

export const tests = [
  {
    title: 'Is loading',
    render: () => <View {...props} isLoading={true} />,
  },
  {
    title: 'Is saving',
    render: () => <View {...props} isSaving={true} />,
  },
  {
    title: 'Editor',
    render: () => <View {...props} />,
  },
  {
    title: 'Source',
    render: () => <View {...props} activeTab="SOURCE" />,
  },
  {
    title: 'Advisory',
    render: () => <View {...props} activeTab="ADVISORY" />,
  },
  {
    title: 'HTML',
    render: () => <View {...props} activeTab="HTML" />,
  },
  {
    title: 'CSAF-JSON',
    render: () => <View {...props} activeTab="CSAF-JSON" />,
  },
]
