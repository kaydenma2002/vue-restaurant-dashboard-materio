export default [
  { heading: 'UI Elements' },
  {
    title: 'Typography',
    icon: { icon: 'mdi-alpha-t-box-outline' },
    to: 'pages-typography',
  },
  {
    title: 'Icons',
    icon: { icon: 'mdi-eye-outline' },
    to: 'pages-icons',
  },
  {
    title: 'Cards',
    icon: { icon: 'mdi-credit-card-outline' },
    children: [
      { title: 'Basic', to: 'pages-cards-card-basic' },
      { title: 'Statistics', to: 'pages-cards-card-statistics' },
      { title: 'Advance', to: 'pages-cards-card-advance' },
      { title: 'Widgets', to: 'pages-cards-card-widgets' },
      { title: 'Gamification', to: 'pages-cards-card-gamification' },
      { title: 'Actions', to: 'pages-cards-card-actions' },
    ],
  },
  {
    title: 'Components',
    icon: { icon: 'mdi-archive-outline' },
    children: [
      { title: 'Alert', to: 'components-alert' },
      { title: 'Avatar', to: 'components-avatar' },
      { title: 'Badge', to: 'components-badge' },
      { title: 'Button', to: 'components-button' },
      { title: 'Chip', to: 'components-chip' },
      { title: 'Dialog', to: 'components-dialog' },
      { title: 'Expansion Panel', to: 'components-expansion-panel' },
      { title: 'List', to: 'components-list' },
      { title: 'Menu', to: 'components-menu' },
      { title: 'Pagination', to: 'components-pagination' },
      { title: 'Progress Circular', to: 'components-progress-circular' },
      { title: 'Progress Linear', to: 'components-progress-linear' },
      { title: 'Snackbar', to: 'components-snackbar' },
      { title: 'Tabs', to: 'components-tabs' },
      { title: 'Timeline', to: 'components-timeline' },
      { title: 'Tooltip', to: 'components-tooltip' },
    ],
  },
  {
    title: 'Extensions',
    icon: { icon: 'mdi-cube-outline' },
    children: [
      { title: 'Tour', to: 'extensions-tour' },
    ],
  },
]
