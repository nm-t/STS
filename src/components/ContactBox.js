import React from 'react';
import InfoBox from './InfoBox';

const ContactBox = ({open, onRequestClose}) => (
  <InfoBox title="Contact" open={open} onRequestClose={onRequestClose}>
    <h3>Problem owner</h3>
    Dr. Tibor Schuster: <a href="mailto:tibor.schuster@mcri.edu.au">tibor.schuster@mcri.edu.au</a>

    <h3>Development</h3>
    Github: <a href="https://github.com/nm-t/STS">https://github.com/nm-t/STS</a>
    <p/>
    Joash Chong: <a href="mailto:joash.is@gmail.com">joash.is@gmail.com</a>
    <p/>
    Alex:
    <p/>
    Louis:
    <p/>
    Nathalia:
    <p/>
    Nathan:
  </InfoBox>
);

export default ContactBox;
