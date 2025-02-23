import React from 'react';

import renderer from "react-test-renderer";

import {globalInstance, UiInstance, activeUserMaker} from "../../helper/test-helper";

import {ProposalVoteBtn} from './index';

const allOver = () => new Promise((resolve) => setImmediate(resolve));

let MOCK_MODE: number = 1;

jest.mock("../../api/hive", () => ({
    getProposalVotes: (proposalId: number, voter: string = "", limit: number = 300) =>
        new Promise((resolve) => {

            if (MOCK_MODE === 1) {
                resolve([]);
                return;
            }

            if (MOCK_MODE === 2) {
                resolve([{
                    voter: "foo"
                }]);
                return;
            }
        }),
}));

const defProps = {
    global: globalInstance,
    users: [],
    activeUser: activeUserMaker("foo"),
    ui: UiInstance,
    signingKey: "",
    proposal: 12,
    setActiveUser: () => {
    },
    updateActiveUser: () => {
    },
    deleteUser: () => {
    },
    toggleUIProp: () => {
    },
    setSigningKey: () => {
    },
}


it('(1) Default render.', async () => {
    const props = {...defProps};

    const component = renderer.create(<ProposalVoteBtn {...props}/>);
    await allOver();
    expect(component.toJSON()).toMatchSnapshot();
});


it('(2) Voted.', async () => {
    MOCK_MODE = 2;

    const props = {...defProps};

    const component = renderer.create(<ProposalVoteBtn {...props}/>);
    await allOver();
    expect(component.toJSON()).toMatchSnapshot();
});

