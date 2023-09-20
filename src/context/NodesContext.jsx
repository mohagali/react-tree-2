import { createContext, useContext, useReducer,useState } from 'react';
import { getDescendants } from "@minoru/react-dnd-treeview";

const NodesContext = createContext(null);

const NodesDispatchContext = createContext(null);

export function NodesProvider({ children }) {
  const [nodes, dispatch] = useReducer(
    nodesReducer,
    initialNodes
  );

  const [selectedNodeId,setSelectedNodeId]=useState(null)

  const handleSelect = (id) => {
    console.log('handleSelect',id)
    if (id == selectedNodeId)
    setSelectedNodeId(null)
    else
    setSelectedNodeId(id)
};

  return (
    <NodesContext.Provider value={{nodes,selectedNodeId,handleSelect}}>
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
      console.log('changed',action)
       return nodes.map(t => {
        if (t.id === action.node.id) {
          return action.node;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      // return tasks.filter(t => t.id !== action.id);

      console.log("deleted", action)
      const id = action.id;
      const deleteIds = [
        id,
        ...getDescendants(nodes, id).map((node) => node.id)
      ];
      console.log("nodes", nodes)
      console.log("deleteIds", deleteIds)
      return nodes.filter((node) => !deleteIds.includes(node.id));

    }
    default: {
      // throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialNodes = [

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
