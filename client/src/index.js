import React, { Profiler } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
// import store from './store'
const onRenderCallback = (
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) => {
  console.log({
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions,
  });
};

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 
 <Provider store={store}>
  <Profiler id="App" onRender={onRenderCallback}>

    <App />
  </Profiler>
  </Provider>
 </BrowserRouter>
)
