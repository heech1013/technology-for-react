import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ListWrapper from 'components/list/ListWrapper/ListWrapper.js';
import PostList from 'components/list/PostList/PostList.js';
import Pagination from 'components/list/Pagination/Pagination.js';

const ListPage = () => {
  return (
    <PageTemplate>
      <ListWrapper>
        <PostList/>
        <Pagination/>
      </ListWrapper>
    </PageTemplate>
  );
};

export default ListPage;