import type { NextPage } from 'next'
import styles from '@/Components/home.module.css'

function Rectangle({children} : any)
{
    return <div className={styles.rectangle}>{children}</div>
}

export default Rectangle