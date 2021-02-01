export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        name: 'index',
        path: '/',
        component: './Home',
      },
    ],
  },
];
