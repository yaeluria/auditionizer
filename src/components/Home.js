// import page from '../hocs/page.js';
// import MyPageComponent from './my-page-component.js';
// export default page(MyPageComponent);

import protectedRoute from './protectedRoute';
import Main from './Main';

export default protectedRoute(Main);