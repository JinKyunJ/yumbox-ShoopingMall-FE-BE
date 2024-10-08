import { loginUser } from '../Login/common/remotes.js';

/** X 버튼 클릭 시 이전 페이지로 이동 */
const onCloseButton = document.querySelector('.head-x-button');

onCloseButton.addEventListener('click', () => {
    // 이전 페이지로 이동 => 메인 페이지로 이동
    window.location.href = '/';
});

/** 로그인 버튼 클릭 시 서버에 사용자가 입력한 email, password 전송 */
const onLoginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');

onLoginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // 기본 폼 제출 방지

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        await loginUser(email, password);
    } catch (error) {
        alert(error.message);
    }
});

/** 회원가입 버튼 클릭 시 회원가입 페이지로 이동 */
const onSignupButton = document.querySelector('.signup-button');
onSignupButton.addEventListener('click', () => {
    // 회원가입 페이지로 이동
    window.location.href = '../Signup/Signup.html';
});
