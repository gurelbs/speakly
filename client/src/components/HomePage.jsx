import React,{useEffect,useState} from 'react'
import './styles/page-animation.css'
import './styles/homepage.css'
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
export default function HomePage() {
    const [imageLoad, setImageLoad] = useState(false)
    useEffect(() => setImageLoad(true), [])
    return (
        <Paper elevation={0}>
            {imageLoad ? (
  <Container className='page text-center d-flex justify-content-center h-100 p-3 mx-auto flex-column bg-gif h-100 w-100 mx-auto' style={{minWidth:'100%'}}>
  <div className='jumbotron d-block' style={{minWidth:'calc("100% - 64px")'}}>
      <h1 className="wellcome-msg "><span>ספיקלי</span></h1>
  </div>
  <div className='container'>
      <h4 className="cover-txt">מנוע לזיהוי וסינתוז קול <span>בעברית</span></h4>
  </div>
</Container>
) : (
  <Skeleton variant="rect" width={210} height={118} />
)}

        </Paper> 
    )
}
