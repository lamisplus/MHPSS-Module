import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import {Label} from "reactstrap";


function CreateUpdateMHPSS(){
    return (
        <>
        <Formik
            initialValues =  {{title: '', firstName: ''}}
            validationSchema = {Yup.object({
                title: Yup.string('Title must be a string').required('Please select a title'),
                firstName: Yup.string('Name must be a string').required('Please enter your name'),
            })}
            onSubmit={(values, actions) => {
                console.log(values);
                actions.setSubmitting(false);
            }}
        >
            {formik => (
                <Form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
                    <div className="col-lg-6 col-md-6 col-xl-6 col-xxl-6">
                        <Label htmlFor="title">
                            Title
                        </Label>
                        <Field name="title" id="title" as="input" className="form-control" />
                        <div  className='text-red-600'>
                            <ErrorMessage name="title" />
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    </>
    )
}

export default CreateUpdateMHPSS