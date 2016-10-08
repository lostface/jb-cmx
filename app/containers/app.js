import * as React from 'react';
import { Layout, Header, Textfield, Drawer, Navigation, Content } from 'react-mdl';

export default React.createClass({
  render() {
    return (
      <div>
        <Layout fixedHeader>
          <Header title="Marvel HEROeS">
            <Textfield
              value=""
              label="Search"
              expandable
              expandableIcon="search"
            />
          </Header>
          <Drawer title="Menu">
            <Navigation>
              <p>About</p>
            </Navigation>
          </Drawer>
          <Content/>
        </Layout>
      </div>
    );
  },
});
