
import { inject } from '../../functions/index.js';

import AddPage from './AddPage/index.js';
import DetailPage from './DetailPage/index.js';
import EditPage from './EditPage/index.js';
import ListPage from './ListPage/index.js';

export default inject({
    AddPage,
    DetailPage,
    EditPage,
    ListPage
});
