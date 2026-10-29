import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import ComingSoon from './ComingSoon';
import './index.css';
const root=document.getElementById('root');
const app=<React.StrictMode><ComingSoon/></React.StrictMode>;
if(root.hasChildNodes())hydrateRoot(root,app);else createRoot(root).render(app);
