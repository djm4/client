import { Map } from 'immutable'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'

import { fetchAllBallots } from '../actions'
import { cleanBallots } from '../nomination-count'

class CategoryInfo extends React.Component {
  static propTypes = {
    allBallots: PropTypes.instanceOf(Map),
    allNominations: PropTypes.instanceOf(Map),
    canon: PropTypes.instanceOf(Map).isRequired,
    category: PropTypes.string,
    fetchAllBallots: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired
  }

  static ballotSizer(ballots, key) {
    return (
      <div style={{ display: 'flex', marginBottom: '1em' }}>
        {[1, 2, 3, 4, 5].map(n => (
          <div key={key + n} style={{ flex: 1, textAlign: 'center' }}>
            <b>{ballots.filter(ballot => ballot.size === n).size}</b>
            <br />
            <small>{n}</small>
          </div>
        ))}
      </div>
    )
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { allBallots, category, fetchAllBallots } = nextProps
    if (category && allBallots.isEmpty()) fetchAllBallots()
  }

  render() {
    const {
      allBallots,
      allNominations,
      canon,
      category,
      onRequestClose
    } = this.props
    if (!category || allBallots.isEmpty()) return null
    const ballots = allBallots
      .get(category, Map())
      .filter(ballot => ballot.size)
    const nominations = allNominations.get(category)
    const cb = cleanBallots(category, allBallots, allNominations, canon).filter(
      ballot => ballot.size
    )
    return (
      <Dialog
        onRequestClose={onRequestClose}
        open={!!category}
        title={category}
      >
        <div style={{ display: 'flex' }}>
          <ul style={{ flex: 1, listStyleType: 'none', padding: '0 1em' }}>
            <li>
              Raw ballots: <b>{ballots.size}</b>
            </li>
            <li>By size: {CategoryInfo.ballotSizer(ballots, 'r')}</li>
            <li>
              Raw unique nominations: <b>{nominations.size}</b>
            </li>
          </ul>
          <ul style={{ flex: 1, listStyleType: 'none', padding: '0 1em' }}>
            <li>
              Clean ballots: <b>{cb.size}</b>
            </li>
            <li>By size: {CategoryInfo.ballotSizer(cb, 'c')}</li>
            <li>
              Clean unique nominations: <b>{cb.flatten(true).toSet().size}</b>
            </li>
            <li>
              Disqualified:{' '}
              <b>{canon.filter(cd => cd.get('disqualified')).size}</b>
            </li>
          </ul>
        </div>
      </Dialog>
    )
  }
}

export default connect(
  ({ hugoAdmin }, { category }) => ({
    allBallots: hugoAdmin.get('ballots'),
    allNominations: hugoAdmin.get('nominations'),
    canon: (category && hugoAdmin.getIn(['canon', category])) || Map()
  }),
  {
    fetchAllBallots
  }
)(CategoryInfo)
