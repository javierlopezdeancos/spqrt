import React, { createContext, useContext } from 'react';
import { Member } from '../members/member.model';

const defaultState = {
  membersGroupedByLevel: null,
  setMembersGroupedByLevel: (m: Member[][]): void => {}
};

const OrganizationContext = createContext(defaultState);

class OrganizationProvider extends React.Component {
  state = {
    membersGroupedByLevel: null,
  };

  setMembersGroupedByLevel = (m: Member[][]): void => {
    this.setState({
      ...this.state,
      membersGroupedByLevel: m,
    });
  };

  render() {
    const { children } = this.props;
    const { membersGroupedByLevel } = this.state;

    return (
      <OrganizationContext.Provider
        value={{
          membersGroupedByLevel,
          setMembersGroupedByLevel: this.setMembersGroupedByLevel,
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
