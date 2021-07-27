import * as ActionTypes from '../constants/actionTypes';
import configureStore from './configureStore';


describe('Store', () => {
  let nodes = {}

  beforeAll(() => {
    nodes = {
      list: [
        { url: 'a.com', online: false, name: null, loading: false, data: undefined },
        { url: 'b.com', online: false, name: null, loading: false, data: undefined },
        { url: 'c.com', online: false, name: null, loading: false, data: undefined },
        { url: 'd.com', online: false, name: null, loading: false, data: undefined }
      ]
    };
  });
  afterAll(() => {});

  it('should display results when necessary data is provided', () => {
    const store = configureStore({nodes});

    const actions = [
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: {node_name: 'alpha'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[1], res: {node_name: 'beta'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: {node_name: 'gamma'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[2], res: {node_name: 'delta'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[1], res: {node_name: 'epsilon'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: {node_name: 'zeta'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: {node_name: 'eta'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: {node_name: 'theta'} },
    ];
    actions.forEach(action => store.dispatch(action));

    const actual = store.getState();
    const expected = {
      list: [
        { url: 'a.com', online: true, name: 'theta', loading: false, data: undefined },
        { url: 'b.com', online: true, name: 'epsilon', loading: false, data: undefined },
        { url: 'c.com', online: true, name: 'delta', loading: false, data: undefined },
        { url: 'd.com', online: false, name: null, loading: false, data: undefined }
      ]
    };

    expect(actual.nodes).toEqual(expected);
  });

  it('should display blocks when necessary data is provided', () => {
    const store = configureStore({nodes});

    const actions = [
      { type: ActionTypes.GET_NODE_BLOCK_SUCCESS, node: nodes.list[0], res: {data: [{id: '1'}]} },
      { type: ActionTypes.GET_NODE_BLOCK_SUCCESS, node: nodes.list[1], res: {data: [{id: '2'}]} },
      { type: ActionTypes.GET_NODE_BLOCK_SUCCESS, node: nodes.list[0], res: {data: [{id: '3'}]} },
      { type: ActionTypes.GET_NODE_BLOCK_SUCCESS, node: nodes.list[2], res: {data: [{id: '4'}]} },
      { type: ActionTypes.GET_NODE_BLOCK_SUCCESS, node: nodes.list[1], res: {data: [{id: '5'}]} },
      { type: ActionTypes.GET_NODE_BLOCK_SUCCESS, node: nodes.list[0], res: {data: [{id: '6'}]} },
      { type: ActionTypes.GET_NODE_BLOCK_SUCCESS, node: nodes.list[0], res: {data: [{id: '7'}]} },
      { type: ActionTypes.GET_NODE_BLOCK_SUCCESS, node: nodes.list[0], res: {data: [{id: '8'}]} },
    ];
    actions.forEach(action => store.dispatch(action));

    const actual = store.getState();
    const expected = {
      list: [
        { url: 'a.com', online: false, name: null, loading: false, data: [{id: '8'}] },
        { url: 'b.com', online: false, name: null, loading: false, data: [{id: '5'}] },
        { url: 'c.com', online: false, name: null, loading: false, data: [{id: '4'}] },
        { url: 'd.com', online: false, name: null, loading: false, data: undefined }
      ]
    };

    expect(actual.nodes).toEqual(expected);
  });
});
