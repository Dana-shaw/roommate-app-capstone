import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Home.css'
import LoginForm from '../../components/LoginForm';

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    useEffect(() => {

    }, [dispatch])

    return (
        <div className={!user? 'auth-forms' : 'content'}>
        {!user? <LoginForm/>: <div className="content">
            <div className="content-header">
                <h1>Chores</h1>
            </div>
            <div className="container-item-tile">
                
            </div>
        </div>}
        </div>
    )
}

export default Home;