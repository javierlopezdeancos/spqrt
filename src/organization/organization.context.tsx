import React, { createContext, useContext } from 'react';
import { Member } from './members/member.model';
import Levels from './levels/levels.model';

const defaultState = {
  membersGroupedByLevel: null,
  setMembersGroupedByLevel: (m: Member[][]): void => { },
  updateMember: (m: Member): void => { },
  getMembers: (): Member[][] | null => { return null },
  removeMember: (m: Member): void => { },
};

const OrganizationContext = createContext(defaultState);

class OrganizationProvider extends React.Component {
  state = {
    membersGroupedByLevel: null,
  };

  getMembers = (): Member[][] | null => {
    return this.state.membersGroupedByLevel ? [...this.state.membersGroupedByLevel] : null;
  }

  setMembersGroupedByLevel = (m: Member[][]): void => {
    this.setState({
      ...this.state,
      membersGroupedByLevel: m,
    });
  };

  addMember = (m: Member): Member[][] | null => {
    let members: Member[][] | null = null;

    if (this?.state?.membersGroupedByLevel) {
      members = [...this.state.membersGroupedByLevel];
    } else {
      members = []
    }

    for (let l = 0; l < Levels.length; l++) {
      for (let i = 0; i < Levels[l].length; i++) {
        const level = Levels[l][i];

        if (level === m.title) {
          if (members.length === 0 || !members[l]) {
            members[l] = [];
          }

          members[l].push(m);
          return members;
        }
      }
    }

    return null;
  };

  removeMember = (m: Member): void => {
    let membersUpdatedGroupedByLevel: Member[][] | null;

    if (this?.state.membersGroupedByLevel) {
      membersUpdatedGroupedByLevel = [...this.state.membersGroupedByLevel];

      for (let mls = 0; mls < membersUpdatedGroupedByLevel.length; mls++) {
        for (let ml = 0; ml < membersUpdatedGroupedByLevel[mls].length; ml++) {
          const memberUpdatedGroupedByLevel = membersUpdatedGroupedByLevel[mls][ml];

          if (memberUpdatedGroupedByLevel.id === m.id) {
            membersUpdatedGroupedByLevel[mls].splice(ml, 1);
          }
        }
      }

      this.setState({
        ...this.state,
        membersGroupedByLevel: membersUpdatedGroupedByLevel,
      });
    }
  }

  updateMember = (m: Member): void => {
    let membersUpdatedGroupedByLevel: Member[][] | null;

    if (this?.state.membersGroupedByLevel) {
      membersUpdatedGroupedByLevel = [...this.state.membersGroupedByLevel];
    } else {
      membersUpdatedGroupedByLevel = this.addMember(m);
      return;
    }

    if (membersUpdatedGroupedByLevel) {
      this.removeMember(m);
      this.addMember(m);

      this.setState({
        ...this.state,
        membersGroupedByLevel: membersUpdatedGroupedByLevel,
      });
    }
  };

  render() {
    const { children } = this.props;
    const { membersGroupedByLevel } = this.state;

    return (
      <OrganizationContext.Provider
        value={{
          membersGroupedByLevel,
          getMembers: this.getMembers,
          updateMember: this.updateMember,
          setMembersGroupedByLevel: this.setMembersGroupedByLevel,
          removeMember: this.removeMember,
        }}
      >
        {children}
      </OrganizationContext.Provider>
    );
  }
}

const useOrganization= () => useContext(OrganizationContext);

export default useOrganization;

export { OrganizationContext, OrganizationProvider };
