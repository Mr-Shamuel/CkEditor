import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";//ck editor
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";//ck editor

import "./Preamble.css";
import axiosInstance from "../../../../../Services/Interceptor";
import { getPreambleByStructure } from "../../../../../Redux/Actions/Apamanagement/ApaPreparationByUser/Preamble/PrembleAction";

const CkEdior = ({ selectedItem }) => {
    const { t, i18n } = useTranslation();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            description: "",
        },
    });

    const dispatch = useDispatch();
    const { preambleData } = useSelector((state) => state.preambleData); //total preamble all performance

    useEffect(() => {
        dispatch(getPreambleByStructure(selectedItem?.structureId));
    }, [dispatch, selectedItem?.structureId]);

    const onSubmit = (data) => {
        axiosInstance
            .put(
                `/apa-config/api/v1/preambles/${selectedItem?.entityId}`,

                {
                    description: data?.description,
                    structureId: selectedItem?.structureId,
                    titleBn: preambleData?.titleBn,
                    titleEn: preambleData?.titleEn,
                }
            )
            .then((res) => {
                console.log(res, "update successfully");
                dispatch(getPreambleByStructure(selectedItem?.structureId));
                toast.success("সম্পাদনা করা হয়েছে", {
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: false,
                    autoClose: 500,
                    theme: "colored",
                });


            });
    };


    return (
        <div className="ckEditor_con">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Form.Label className="form-label text-dark  mb-3 mt-0  fw-bolder">
                    {" "}
                    {selectedItem?.structureTypeBn}
                </Form.Label>

                <Controller
                    name="description"
                    control={control}
                    rules={{ required: "This field is required." }}
                    render={({ field }) => (
                        <CKEditor
                            editor={ClassicEditor}
                            data={preambleData?.description}
                            onChange={(event, editor) => {
                                const value = editor.getData();
                                field.onChange(value);
                            }}
                        />
                    )}
                />
                {errors?.description?.type === "required" && (
                    <span className="text-danger" style={{ fontSize: "16px" }}>
                        {i18n.language === "en"
                            ? " Name (English) Required"
                            : "এই তথ্যটি আবশ্যক"}
                    </span>
                )}

                <div className="div d-flex justify-content-end mx-3 mt-3">
                    <button className="btn btn-danger btn-md mx-2">ফিরে যান</button>
                    <button className="btn btn-success btn-md" type="submit">
                        সম্পাদনা করুন
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CkEdior;