import * as React from 'react';
import * as R from 'ramda';
import { Spinner, Layout, Header, Drawer, Navigation, Content } from 'react-mdl';
import { HeroList, HeroDetailDialog, SearchField } from '../components';
import { searchHeroes } from '../services';

export default React.createClass({
  render() {
    const { heroes, showHeroDetailDialog, selectedHero, showSpinner } = this.state;

    return (
      <div>
        <Layout fixedHeader>
          <Header title="Marvel HEROeS">
            <SearchField onSearchTrigger={this.search} />
          </Header>
          <Drawer title="Menu">
            <Navigation>
              <p>About</p>
            </Navigation>
          </Drawer>
          <Content>
            { showSpinner ? <Spinner style={{ position: 'fixed', top: '77px', left: '97%'}} /> : null }
            <HeroList heroes={heroes} onHeroWantMoreClick={this.handleHeroWantMoreClick} />
          </Content>
        </Layout>
        <HeroDetailDialog
          show={showHeroDetailDialog}
          hero={selectedHero}
          onCloseTrigger={this.closeHeroDetailDialog} />
      </div>
    );
  },

  getInitialState() {
    return {
      heroes: [],
      showHeroDetailDialog: false,
      selectedHero: undefined,
      showSpinner: false,
    };
  },

  search(searchText) {
    // TODO empty search not supported yet
    if (searchText === '') { return; }

    this.showSpinner();
    const hideSpinner = () => { this.hideSpinner(); };

    // TODO error handling
    searchHeroes(searchText)
      .then(heroes => this.setState({ heroes }))
      .then(hideSpinner, hideSpinner);
  },

  showSpinner() {
    this.setState({ showSpinner: true });
  },

  hideSpinner() {
    this.setState({ showSpinner: false });
  },

  findHeroById(id) {
    const findHeroWithId = R.find(R.propEq('id', id));
    return findHeroWithId(this.state.heroes);
  },

  showHeroDetailDialog(hero) {
    this.setState({
      selectedHero: hero,
      showHeroDetailDialog: true,
    });
  },

  closeHeroDetailDialog() {
    this.setState({
      selectedHero: undefined,
      showHeroDetailDialog: false,
    });
  },

  handleHeroWantMoreClick(heroId) {
    const hero = this.findHeroById(heroId);
    this.showHeroDetailDialog(hero);
  },
});
