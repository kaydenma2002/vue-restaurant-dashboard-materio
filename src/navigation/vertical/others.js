export default [
  { heading: 'Others' },
  {
    title: 'Access Control',
    icon: { icon: 'mdi-shield-outline' },
    to: 'access-control',
    action: 'read',
    subject: 'AclDemo',
  },
  {
    title: 'Nav Levels',
    icon: { icon: 'mdi-menu' },
    children: [
      {
        title: 'Level 2.1',
        to: null,
      },
      {
        title: 'Level 2.2',
        children: [
          {
            title: 'Level 3.1',
            to: null,
          },
          {
            title: 'Level 3.2',
            to: null,
          },
        ],
      },
    ],
  },
  {
    title: 'Disabled Menu',
    to: null,
    icon: { icon: 'mdi-eye-off-outline' },
    disable: true,
  },
  {
    title: 'Raise Support',
    href: 'https://themeselection.com/support/',
    icon: { icon: 'mdi-lifebuoy' },
    target: '_blank',
  },
  {
    title: 'Documentation',
    href: 'https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/documentation/',
    icon: { icon: 'mdi-file-document-outline' },
    target: '_blank',
  },
]
