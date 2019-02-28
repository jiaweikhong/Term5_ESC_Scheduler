import React from 'react';

function hello(e) {
    console.log("hello wosdfjs")
}

const About = () => {
    return (
        <div>
            <p>About</p>
            {/* <button onClick={hello}>
                console hello
            </button> */}
            <form action="" method="post">
                <input type="submit" name="click"/>
            </form>
        </div>
    );
};

export default About;