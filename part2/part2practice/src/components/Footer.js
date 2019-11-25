import React from 'react';

const Footer = () => {
  const footerStyle= {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  };

  return(
        <>
            <div style={footerStyle}>
              <br/>
              <p>to test this out you can use  username: &quot;michelin&quot; and password: &quot;atyrecompany&quot;</p>

              <br/>
              <em> Note App, Department of Computer Science, University of Helsinki 2019</em>
            </div>
        </>
  );
};

export default Footer;
