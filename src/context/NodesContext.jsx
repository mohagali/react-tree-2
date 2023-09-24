import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { getDescendants } from "@minoru/react-dnd-treeview";
import { getLastId }  from '../utils/nodes'

const NodesContext = createContext(null);

const NodesDispatchContext = createContext(null);

export function NodesProvider({ children }) {

  // Function to fetch data from localStorage

  const [nodes, dispatch] = useReducer(
    nodesReducer,
    initialNodes
  );
  useEffect(() => {

    // Function to fetch data from localStorage
    const fetchDataFromLocalStorage = () => {
      const savedData = localStorage.getItem('data');
      console.log('init', savedData)
      if (savedData) {
        const savedDataJson = JSON.parse(savedData);
        dispatch({
          type: 'init',
          savedDataJson
        })
      } else {
        dispatch({
          type: 'init',
          savedDataJson: initialNodes2
        })
      }
    };

    fetchDataFromLocalStorage();

  }, [])

  useEffect(() => {

    // Function to update data and save to localStorage
    const updateData = () => {
      if (nodes.length)
        localStorage.setItem('data', JSON.stringify(nodes));
    };
    updateData()
  }, [nodes])

  const [selectedNodeId, setSelectedNodeId] = useState(null)

  const handleSelect = (id) => {
    // console.log('handleSelect',id)
    if (id == selectedNodeId)
      setSelectedNodeId(null)
    else
      setSelectedNodeId(id)
  };

  return (
    <NodesContext.Provider value={{ nodes, selectedNodeId, handleSelect }}>
      <NodesDispatchContext.Provider value={dispatch}>
        {children}
      </NodesDispatchContext.Provider>
    </NodesContext.Provider>
  );
}

export function useNodes() {
  return useContext(NodesContext);
}

export function useNodesDispatch() {
  return useContext(NodesDispatchContext);
}

function nodesReducer(nodes, action) {
  switch (action.type) {
    case 'init': {
      return [...action.savedDataJson]
    }

    case 'drop': {
      return action.newNodes
    }
    case 'added': {
      // return [...nodes, {
      //   id: action.id,
      //   text: action.text,
      //   done: false
      // }];
    }
    case 'changed': {
      console.log('changed', action)
      return nodes.map(t => {
        if (t.id === action.node.id) {
          return action.node;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      const id = action.id;
      const deleteIds = [
        id,
        ...getDescendants(nodes, id).map((node) => node.id)
      ];

      return nodes.filter((node) => !deleteIds.includes(node.id));

    }
    case 'copy':{
      const id = action.id;
      const lastId = getLastId(nodes);
      const targetNode = nodes.find((n) => n.id === id);
      const descendants = getDescendants(nodes, id);
      const partialNodes = descendants.map((node) => ({
        ...node,
        id: node.id + lastId,
        parent: node.parent + lastId
      }));
  
      return [
        ...nodes,
        {
          ...targetNode,
          id: targetNode.id + lastId
        },
        ...partialNodes
      ];

    }

    default: {
      // throw Error('Unknown action: ' + action.type);
    }
  }
}
const initialNodes = [];
const initialNodes2 = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: "Row 1",
    data: {
      direction: "row",
      fileType: "row"
    }
  },
  {
    id: 2,
    parent: 1,
    droppable: false,
    text: "Image 1-1",
    data: {
      fileType: "image"
    }
  },
  {
    id: 3,
    parent: 1,
    droppable: false,
    text: "Text 1-2 chemi mohamed 12345",
    data: {
      fileType: "text"
    }
  },
  {
    id: 4,
    parent: 0,
    droppable: true,
    text: "Column 2",
    data: {
      fileType: "column",
      direction: "column"
    }
  },
  {
    id: 5,
    parent: 4,
    droppable: true,
    text: "Row 2-1",
    data: {
      fileType: "link",
      link: "https://studio.grapesjs.com/"
    }
  },
  {
    id: 6,
    parent: 5,
    droppable: false,
    text: "Text 2-1-1",
    data: {
      fileType: "text"
    }
  },
  {
    id: 7,
    parent: 5,
    droppable: false,
    text: "Text 2-1-2",
    data: {
      fileType: "text"
    }
  },
  {
    id: 8,
    parent: 10,
    droppable: false,
    text: "Image 1-1",
    data: {
      fileType: "image"
    }
  },
  {
    id: 9,
    parent: 10,
    droppable: false,
    text: "Text 1-2",
    data: {
      fileType: "text"
    }
  },
  {
    id: 10,
    parent: 1,
    droppable: true,
    text: "Box 1",
    data: {
      fileType: "box"
    }
  }

];
