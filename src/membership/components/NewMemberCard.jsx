import PropTypes from 'prop-types'
import React from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'

import * as PaymentPropTypes from '../../payments/proptypes'
import MemberTypeList from './MemberTypeList'

const contents = {
  all: {
    title: 'Buy new membership',
    body: (
      <div>
        <p>
          Persons who have never been attending or supporting members of any
          previous Worldcon and are residents of the Island of Ireland 
	  are eligible for a <b>Island of Ireland resident First Worldcon</b> attending
          membership of Dublin 2019, an Irish Worldcon.
        </p>
        <p>
          <b>Child</b> members are not eligible to participate in the Hugo
          Awards or Site Selection processes.
        </p>
        <p>
          A <b>Supporting</b> membership of Dublin 2019, an Irish Worldcon grants you the right to
          participate in the functions of the World Science Fiction Society
          (Hugo Awards and Site Selection), but does not grant general admission
          to the convention.
        </p>
        <p>
          Participants of the 2019 Worldcon Site Selection have been
          automatically granted supporting membership.
        </p>
      </div>
    ),
    memberships: [
      'YoungAdultNV',
      'AdultNV',
      '_divider',
      'Child',
      'Infant',
      '_divider',
      'SupporterNV',
      '_divider',
      'FirstWorldconNV'
    ]
  },

  attend: {
    title: 'New attending membership',
    body: (
      <div>
        <p>
          Persons who have never been attending or supporting members of any
          previous Worldcon and are residents of the Island of Ireland 
	  are eligible for a <b>Island of Ireland resident First Worldcon</b> attending
          membership of Dublin 2019, an Irish Worldcon.
        </p>
        <p>
          Persons born on 14 August 1994 or later qualify for <b>YoungAdult</b>{' '}
          attending memberships of Dublin 2019, an Irish Worldcon.
        </p>
        <p>
          All attending memberships carry the same rights as supporting
          memberships, in addition to the right of general admission to the
          convention.
        </p>
      </div>
    ),
    memberships: ['FirstWorldconNV', 'YoungAdultiNV', 'AdultNV']
  },

  child: {
    title: 'New child/infant membership',
    body: (
      <div>
        <p>
          <b>Child</b> and <b>Infant</b> members are not eligible to
          participate in the Hugo Awards or Site Selection processes.
        </p>
      </div>
    ),
    memberships: ['Child', 'Infant']
  },

  daypass: {
    title: 'New day pass',
    body: (
      <div>
        <p>
          If you are only able to come to Dublin 2019, an Irish Worldcon for a day or two, we have
          day passes available. This pass will entitle you to enjoy the
          activities, programming and events of Worldcon for that day, except
          for the parties in the evenings.
        </p>
        <p>
          Day passes do not include guaranteed seating to the Hugo Ceremony
          (Friday) and the Masquerade (Saturday). While we expect to be able to
          seat everyone, those with full attending memberships will have
          precedence for this special event seating.
        </p>
      </div>
    ),
    memberships: ['AdultNV', 'YoungAdultNV', 'ChildNV']
  },

  support: {
    title: 'New supporting membership',
    body: (
      <div>
        <p>
          A non-attending membership of Dublin 2019, an Irish Worldcon which will grant you the
          right to participate in the functions of the World Science Fiction
          Society (Hugo Awards and Site Selection).
        </p>
        <p>
          Participants of the 2019 Worldcon Site Selection have been
          automatically granted supporting membership. Supporting memberships
          may be upgraded to attending memberships.
        </p>
      </div>
    ),
    memberships: ['SupporterNV']
  },

  upgrade: {
    title: 'Upgrade membership',
    body: (
      <div>
        <p>
          <b>Supporting</b> and other memberships may be upgraded to attending
          memberships for the current difference in membership costs. To upgrade
          your own or someone else's membership, you'll need to be logged in to
          our services.
        </p>
      </div>
    ),
    memberships: ['Upgrade']
  }
}

const NewMemberCard = ({
  category,
  data,
  disabled = false,
  expandable = false,
  onSelectType
}) => {
  const { title, body, memberships } = contents[category]
  return (
    <Card style={{ marginBottom: 24 }}>
      <CardHeader
        actAsExpander={expandable}
        className="action-head"
        showExpandableButton={expandable}
        textStyle={{ paddingRight: 0 }}
        title={title}
        style={{ fontWeight: 600, marginBottom: 16 }}
      />
      <CardText expandable={expandable} style={{ paddingTop: 0 }}>
        {body}
      </CardText>
      <CardActions style={{ marginLeft: 8, paddingTop: 0 }}>
        <MemberTypeList
          category={category}
          data={data}
          disabled={disabled}
          memberTypes={memberships}
          onSelectType={onSelectType}
          style={{ paddingTop: 0 }}
        />
      </CardActions>
    </Card>
  )
}

NewMemberCard.propTypes = {
  category: PropTypes.oneOf(Object.keys(contents)).isRequired,
  data: PaymentPropTypes.data,
  onSelectType: PropTypes.func.isRequired
}

export default NewMemberCard
