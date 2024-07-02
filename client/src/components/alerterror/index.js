import React from "react";
import { BsEmojiFrown } from "react-icons/bs";
import { motion } from "framer-motion";
import './alerterror.css'

const AlertError = ({ msg }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.6 }}
            animate={{ opacity: 1, y: 50, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.6 }}
            className="alert-01"
        >
            <div className="alert-02">
                <div className="alert-red"></div>
                <BsEmojiFrown className="alert-text-red" />
                <p className="alert-03">
                    {msg?.length > 50 ? `${msg?.slice(0, 50)}...` : msg}
                </p>
            </div>
        </motion.div>
    );
};

export default AlertError;