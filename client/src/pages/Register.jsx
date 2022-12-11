// import styled from "styled-components";
// import { mobile } from "../responsive";

// const Container = styled.div`
//   width: 100vw;
//   height: 100vh;
//   background: linear-gradient(
//       rgba(255, 255, 255, 0.5),
//       rgba(255, 255, 255, 0.5)
//     ),
//     url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
//       center;
//   background-size: cover;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const Wrapper = styled.div`
//   width: 40%;
//   padding: 20px;
//   background-color: white;
//   ${mobile({ width: "75%" })}
// `;

// const Title = styled.h1`
//   font-size: 24px;
//   font-weight: 300;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-wrap: wrap;
// `;

// const Input = styled.input`
//   flex: 1;
//   min-width: 40%;
//   margin: 20px 10px 0px 0px;
//   padding: 10px;
// `;

// const Agreement = styled.span`
//   font-size: 12px;
//   margin: 20px 0px;
// `;

// const Button = styled.button`
//   width: 40%;
//   border: none;
//   padding: 15px 20px;
//   background-color: teal;
//   color: white;
//   cursor: pointer;
// `;

// const Register = () => {
//   return (
//     <Container>
//       <Wrapper>
//         <Title>CREATE AN ACCOUNT</Title>
//         <Form>
//           <Input placeholder="username" />
//           <Input placeholder="email" />
//           <Input placeholder="password" />
//           <Input placeholder="confirm password" />
//           <Agreement>
//             By creating an account, I consent to the processing of my personal
//             data in accordance with the <b>PRIVACY POLICY</b>
//           </Agreement>
//           <Button>CREATE</Button>
//         </Form>
//       </Wrapper>
//     </Container>
//   );
// };

// export default Register;
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authService from '../redux/apiCalls'
import Spinner from '../components/Spinner'
function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(authService.reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(authService.register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register