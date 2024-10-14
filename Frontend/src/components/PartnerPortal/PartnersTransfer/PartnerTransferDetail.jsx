import React from "react";

const TransferDetail = ({ transferDetail }) => {
  return (
    <section className="invoice printableArea">
      <div className="row">
        <div className="col-12">
          <div className="page-header">
            <h2 className="d-inline">
              <span className="fs-30">{transferDetail?.Partner?.name}</span>
            </h2>
            <div className="pull-right text-end">
              <h3>Transfer #{transferDetail?.id}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row invoice-info">
        <div className="col-md-6 invoice-col">
          <address>
            <strong className="text-blue fs-18">
              {transferDetail?.Partner?.address}
            </strong>
            <br />
            <strong className="d-inline">
              {transferDetail?.Partner?.secondaryAddress}
            </strong>
          </address>
        </div>
        <div className="col-md-6 invoice-col text-end">
          <address>
            <strong>Date: {transferDetail?.createdAt.split("T")[0]}</strong>
            <br />

            <strong>Status: {transferDetail?.TransferStatus?.name}</strong>
          </address>
        </div>
      </div>
      <div className="row">
        <div className="col-12 table-responsive">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Medications</th>
                <th>PHARMACY NAME</th>
                <th>PHARMACY PHONE</th>
                <th>PATIENT NAME</th>
                <th>PATIENT EMAIL</th>
                <th>PATIENT DOB</th>
                <th>SIG</th>
                <th>DAY SUPPLY</th>
                <th className="text-end">PROVIDER NAME</th>
                <th className="text-end">PROVIDER PHONE</th>
                <th className="text-end">Notes</th>
              </tr>
              <tr>
                <td className="wrap-text">{transferDetail?.Drug?.name}</td>
                <td className="wrap-text">{transferDetail?.Pharmacy?.name}</td>
                <td className="wrap-text">{transferDetail?.Pharmacy?.phone}</td>
                <td className="wrap-text">
                  {transferDetail?.Customer?.firstName +
                    " " +
                    transferDetail?.Customer?.lastName}
                </td>
                <td className="wrap-text">{transferDetail?.Customer?.email}</td>
                <td className="wrap-text">{transferDetail?.Customer?.dob}</td>
                <td className="wrap-text">{transferDetail?.Sig?.name}</td>
                <td className="wrap-text">
                  {transferDetail?.TransferDay?.name}
                </td>
                <td className="text-end wrap-text">
                  {transferDetail?.providerName}
                </td>
                <td className="text-end wrap-text">
                  {transferDetail?.providerPhone}
                </td>
                <td className="text-end wrap-text">{transferDetail?.notes}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TransferDetail;
