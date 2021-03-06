import React, { Component } from 'react'
import UserItem from '../../../components/User/UserItem'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
// import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Link from '../../../components/Link'
// import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'

const styles = theme => ({
  avatar: {
    display: 'inline-block',
    marginBottom: -10
  }
})

@withStyles(styles, { withTheme: true })
export default class Follows extends Component {
  render() {
    const { followers, following, classes } = this.props
    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              Người theo dõi ({this.props.followers.data.length})
            </Typography>
            <Grid item xs={12} container>
              {this.props.followers.data.length
                ? this.props.followers.data.map(user => {
                    return (
                      <Grid item xs={6} style={{ marginTop: 15 }} key={user._id}>
                        <Avatar alt={user.name} src={user.avatarUrl} className={classes.avatar} />
                        <Typography
                          inline
                          noWrap
                          component="div"
                          variant="body1"
                          style={{ marginLeft: 10 }}
                        >
                          <Link href={`/profile/${user._id}`}>{user.name}</Link>
                        </Typography>
                      </Grid>
                    )
                  })
                : null}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              Đang theo dõi ({this.props.following.data.length})
            </Typography>
            <Grid item xs={12} container>
              {this.props.following.data.length &&
                this.props.following.data.map(user => {
                  return (
                    <Grid item xs={6} style={{ marginTop: 15 }} key={user._id}>
                      <Avatar alt={user.name} src={user.avatarUrl} className={classes.avatar} />
                      <Typography
                        inline
                        noWrap
                        component="div"
                        variant="body1"
                        style={{ marginLeft: 10 }}
                      >
                        <Link href={`/profile/${user._id}`}>{user.name}</Link>
                      </Typography>
                    </Grid>
                  )
                })}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}
