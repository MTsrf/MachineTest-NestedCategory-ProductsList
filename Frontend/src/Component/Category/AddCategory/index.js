import React from 'react';
import Modal from '../../Modal'
import { Row, Col } from 'react-bootstrap';


const AddCategory = (props) => {

    const {
        show,
        handleClose,
        modalTitle,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryList,
        onSubmit
    } = props;

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modalTitle={modalTitle}
        >
            <Row>
                <Col>
                    <input name="name" value={categoryName}
                        placeholder="Category Name"
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="form-control-sm" />

                </Col>
                <Col>
                    <select
                        className="form-control form-control-sm"
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>select category</option>
                        {
                            categoryList.map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
                </Col>
            </Row>


        </Modal>
    );
}

export default AddCategory;