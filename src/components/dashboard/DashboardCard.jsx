/* eslint-disable react/prop-types */
import {
    CardMeta,
    CardHeader,
    CardGroup,
    CardDescription,
    CardContent,
    // Button,
    Card,
    Image,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Link } from 'react-router-dom'

const DashboardCard = ({ recipe }) => (
    <CardGroup className='dashboard-card'
        style={{
            transition: 'transform 0.7s ease-in-out',
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
        }}>
        <Card style={{ backgroundImage: `url('https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}>
            <CardContent>
                <Image
                    floated='right'
                    size='mini'
                    src='https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=600'
                />
                <CardHeader>{recipe?.title}</CardHeader>
                <CardMeta className='font-bold'>{recipe?.category}</CardMeta>
                <CardDescription className='font-bold'>
                    {recipe?.description?.length > 30 ? recipe?.description?.slice(0, 40) : recipe?.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <div className='space-x-2'>
                    <Link to={`/dashboard/details-recipe/${recipe?.id}`} className='btn btn-outline border border-purple-400' style={{ transition: 'background-color 0.7s', color: 'white', fontSize: '1.3em' }}>
                        Details
                    </Link>
                    <Link to={`/dashboard/edit-recipe/${recipe?.id}`} className='btn btn-outline border-purple-400' style={{ transition: 'background-color 0.7s', color: 'white', fontSize: '1.3em' }}>
                        Edit
                    </Link>
                    <Link className='btn btn-outline border-purple-400' style={{ transition: 'background-color 0.7s', color: 'white', fontSize: '1.3em' }}>
                        Delete
                    </Link>
                </div>
            </CardContent>
        </Card>
    </CardGroup>
);

export default DashboardCard