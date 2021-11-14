import React from 'react';
import { Layout,Row,Col } from 'antd';

import "./Footer.scss";

const Footer = () => {
    const {Footer}=Layout;
    return (
        <footer className="footer">
            <div className="footer__container">
                
            <span className="copyright">
            © 2022 ALL RIGHTS RESERVED​ FUAA
             
            </span>
            <span className="copyright">
            ALEJANDRA ACOSTA | ESTUDIANTE INGENIERIA DE SISTEMAS
            </span>
            </div>
           
            
         
      </footer>
    );
}

export default Footer;