import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Col, Button, Row } from 'react-bootstrap'
import axiosInstance from '../../helper/axiosInstance'
import CheckboxTree from 'react-checkbox-tree';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload
} from 'react-icons/io'
import AddCategory from './AddCategory';
const Category = () => {
    const [allcategory, setAllCategory] = useState([])
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [update, setUpdate] = useState(false)
    const [show, setShow] = useState(false);
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
    }, [update])

    const handleClose = () => {
        setShow(false);
    }

    const onSubmit = async () => {


        if (categoryName === "") {
            alert('Category name is required');
            setShow(false);
            return;
        }
        console.log(categoryName);
        try {
            const { data: { success } } = await axios.post("http://localhost:5000/addCategory", { name: categoryName, parentId: parentCategoryId })
            if (success) {
                setUpdate(prev => !prev)
            }
        } catch (error) {
            setError(error.message)
        }

        setCategoryName('');
        setParentCategoryId('');
        handleClose()
    }

    const handleShow = () => setShow(true);
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


    const createCategoryList = (categories, options = []) => {

        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                type: category.type
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }

        return options;
    }
    const categoryList = createCategoryList(allcategory);

    return (
        <>
            <div>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>Category</h3>
                                <div className="actionBtnContainer">
                                    <span>Actions: </span>
                                    <button onClick={handleShow}><IoIosAdd /> <span>Add</span></button>
                                </div>

                            </div>

                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <CheckboxTree
                                nodes={renderCategories(allcategory)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}
                                icons={{
                                    check: <IoIosCheckbox />,
                                    uncheck: <IoIosCheckboxOutline />,
                                    halfCheck: <IoIosCheckboxOutline />,
                                    expandClose: <IoIosArrowForward />,
                                    expandOpen: <IoIosArrowDown />
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
                <AddCategory
                    show={show}
                    handleClose={() => setShow(false)}
                    onSubmit={onSubmit}
                    modalTitle={'Add New Category'}
                    categoryName={categoryName}
                    setCategoryName={setCategoryName}
                    parentCategoryId={parentCategoryId}
                    setParentCategoryId={setParentCategoryId}
                    categoryList={categoryList}
                />
            </div>
        </>
    )
}

export default Category
