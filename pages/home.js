import React, { Component } from 'react'
// import Head from 'next/head'
// import './styles.scss'
// import image from '~/assets/img/bg7.jpg'
import main from '../common/main'
import Layout from '../containers/Layout/Layout'
import Content from '../modules/home'
import reducer from '../modules/home/reducer'
import profileReducer from '../modules/profile/reducer'
import {
  getSuggestMovies,
  getNewMovies,
  getRecommendMovies,
  getSuggestUsers
} from '../modules/home/action'
import { openLeftSideAction } from '../common/action'
import { getMoviesFollowed, getFollowing } from '../modules/profile/action'
// import { red } from '@material-ui/core/colors';
// import _ from 'lodash'

@main({
  Layout: Layout,
  reducers: {
    home: reducer,
    profile: profileReducer
  },
  translationNameSpaces: ['home'],
  routeName: 'home'
})
export default class HomePage extends Component {
  static async getInitialProps({ store, store: { dispatch }, query, req, ...rest }) {
    let { common = {} } = store.getState()
    let promises = []
    // promises.push(dispatch(openLeftSideAction(true)))
    promises.push(dispatch(getSuggestMovies()))
    promises.push(dispatch(getNewMovies()))
    promises.push(dispatch(getSuggestUsers()))

    if (common.isAuthenticated) {
      promises.push(dispatch(getMoviesFollowed(req, common.user._id)))
      promises.push(dispatch(getRecommendMovies(req)))
      promises.push(dispatch(getFollowing(common.user._id)))
    }
    await Promise.all(promises)
    return { query }
  }
  render() {
    return <Content {...this.props} />
  }
}
