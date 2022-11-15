import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import { Input, Select } from '../Styled/styled-component'
const Product = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState("")
    const [categoryId, setCategoryId] = useState("");
    const [allcategory, setAllCategory] = useState([])
    const [error, setError] = useState("")
    const [alert, setAlert] = useState(false)
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
    console.log(allcategory);


    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }

        return options;
    };

    const onSubmit = async () => {
        console.log(name, description, price, categoryId);
        try {
            const { data } = await axios.post("http://localhost:5000/addProducts", { name: name, description: description, price, price, category: categoryId })
            setAlert(true)
            if (data) {
                setTimeout(() => {
                    setAlert(false)
                    setName("")
                    setDescription("")
                    setCategoryId("")
                    setPrice("")
                }, 1000)
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (

        <div style={{ marginTop: "30px" }}>
            <Container>
                <h1>
                    Add Product
                </h1>
                {alert && <Alert style={{ marginTop: '10px' }} variant="success">
                    Product added Successfully
                </Alert>}
                <div style={{ padding: "20px", borderRadius: '3px', backgroundColor: "#e8eaf6" }}>
                    <Row>
                        <Col>
                            <p>Enter Product Name</p>
                            <Input
                                border={'1px solid black'}
                                width={"100%"}
                                value={name}
                                placeholder="Category Name"
                                onChange={(e) => setName(e.target.value)}
                            />

                        </Col>
                        <Col>
                            <p>Enter description</p>
                            <Input
                                border={'1px solid black'}
                                width={"100%"}
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Price</p>
                            <Input
                                border={'1px solid black'}
                                width={"100%"}
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <p>Category</p>
                            <Select
                                name='place'
                                className="headerSearchInput"
                                width={'100%'}
                                value={categoryId}
                                borderRadius={'0px'}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <option>Select Category</option>
                                {createCategoryList(allcategory).map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.name}
                                    </option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Button style={{ backgroundColor: "#5c6bc0" }} onClick={onSubmit}>Submit</Button>
                    </Row>
                </div>
            </Container >
        </div >
    )
}

export default Product
