
import { NavLink } from 'react-router-dom';
import styled from './Category.module.css';

const Category = () => {
  return (
    <>
      <section className={styled.category}>
        <h3>CATEGORIES</h3>
        <div className={styled.primary}>APPLE</div>
        <div className={styled.normal}>
          <NavLink to='all' className={(navData) =>
              navData.isActive ? styled.active : ''} >All</NavLink>
        </div>
        <div>IPHONE & MAC</div>
        <ul>
          <li>
            <NavLink to='iphone' className={({isActive})=> isActive ? styled.active : ''}>Iphone</NavLink>
          </li>
          <li><NavLink to='ipad' className={({isActive})=> isActive ? styled.active : ''}>Ipad</NavLink></li>
          <li><NavLink to='macbook' className={({isActive})=> isActive ? styled.active : ''}>Macbook</NavLink></li>
        </ul>
        <div>WIRELESS</div>
        <ul>
          <li><NavLink to='airpod' className={({isActive})=> isActive ? styled.active : ''}>Airpod</NavLink></li>
          <li><NavLink to='watch' className={({isActive})=> isActive ? styled.active : ''}>Watch</NavLink></li>
        </ul>
        <div>OTHER</div>
        <ul>
          <li><NavLink to='mouse' className={({isActive})=> isActive ? styled.active : ''}>Mouse</NavLink></li>
          <li><NavLink to='keyboard' className={({isActive})=> isActive ? styled.active : ''}>Keyboard</NavLink></li>
          <li><NavLink to='other' className={({isActive})=> isActive ? styled.active : ''}>Other</NavLink></li>
        </ul>
      </section>

    </>
  )
}

export default Category;