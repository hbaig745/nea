import './pages.css'
import { useEffect } from 'react'
import { motion } from 'framer-motion';

function Classes({ navigation }) {
    useEffect(() => {
        navigation()
      }, [])
    return (
        <motion.div id="main" initial={{ opacity:0, transition:'1s' }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: '1s'}}>

        <h1>classes</h1>
        </motion.div>
    )
}

export default Classes;

