import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

const ProductList = () => {
    const [allcategory, setAllCategory] = useState([])
    const [error, setError] = useState('')
    useEffect(() => {

        const fetchData = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/getCategory")
                setAllCategory(data)
            } catch (error) {
                setError(error.message)
            }
        }
        fetchData()
    }, [])
    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories;
    }
    const cate = renderCategories(allcategory)
    console.log(cate);
    return (
        <>
            <div style={{ marginTop: '30px' }}>
                <Container>
                    <Row>
                        <Col sm={3}>
                            <ul>
                                <li></li>
                            </ul>
                        </Col>
                        <Col sm={9}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </Col>


                    </Row>
                </Container>
            </div>
        </>
    )
}

export default ProductList
