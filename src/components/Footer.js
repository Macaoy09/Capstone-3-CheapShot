import { Row } from 'react-bootstrap';
import Fb from '../images/fb.png';
import Git from '../images/git.png';


export default function Footer() {
    return (
        <footer className="bgColor">
                <div style={{justifyContent: 'center', alignContent: 'center', textAlign: 'center', color: 'white'}}>
                    <Row>
                        <div className="mt-2">
                            <img src={Fb} className="footerImgSize"></img>
                            <img src={Git} className="footerImgSize"></img>
                        </div>
                        <div className="mb-2">Copyright © 2023 Kevin Ignacio • Full-Stack Developer</div>
                    </Row>
                </div>
            </footer>
    )
}