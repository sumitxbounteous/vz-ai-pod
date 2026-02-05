import json
import logging
import azure.functions as func
import os
from compare_docx import compare_io_files
from d365_api import DynamicsAPI

app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)


@app.route(route="docx_compare", methods=["GET", "POST"])
def docx_compare(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("docx_compare triggered")

    quote_id = req.params.get("quote_id")

    if not quote_id:
        return func.HttpResponse(
            json.dumps({"error": "quote_id is required"}),
            status_code=400,
            mimetype="application/json"
        )

    # ✅ LOCAL DEV MODE — return MOCK HTML (NO DOCX PARSING)
    if os.getenv("LOCAL_DEV", "false").lower() == "true":
        logging.info("LOCAL_DEV enabled – returning mock HTML")

        doc1_html = """
        <h2>Original Contract</h2>
        <p>This Agreement is effective as of January 1, 2024.</p>
        <p>The payment term is Net 30 days.</p>
        """

        doc2_html = """
        <h2>Revised Contract</h2>
        <p>This Agreement is effective as of January 15, 2024.</p>
        <p>The payment term is Net 45 days.</p>
        """

        diff_html = """
        <h2>Redlined Comparison</h2>
        <p>
          This Agreement is effective as of
          <del style="color:red">January 1, 2024</del>
          <ins style="color:green">January 15, 2024</ins>.
        </p>
        <p>
          The payment term is
          <del style="color:red">Net 30 days</del>
          <ins style="color:green">Net 45 days</ins>.
        </p>
        """

        return func.HttpResponse(
            json.dumps({
                "doc1_html": doc1_html,
                "doc2_html": doc2_html,
                "diff_html": diff_html,
                "diff_summary": "Payment terms and effective date changed"
            }),
            status_code=200,
            mimetype="application/json"
        )

    # ❗ REAL D365 PATH (leave untouched for now)
    d365_api = DynamicsAPI()
    quote_activities = d365_api.get_quote_activities(quote_id)

    if not quote_activities or len(quote_activities.get("value", [])) < 2:
        return func.HttpResponse(
            json.dumps({"error": "Not enough documents to compare"}),
            status_code=404,
            mimetype="application/json"
        )

    doc_original = quote_activities["value"][0]["documentbody"]
    doc_new = quote_activities["value"][1]["documentbody"]

    diff_html, diff_summary, doc1_html, doc2_html = compare_io_files(
        doc_original, doc_new
    )

    return func.HttpResponse(
        json.dumps({
            "doc1_html": doc1_html,
            "doc2_html": doc2_html,
            "diff_html": diff_html,
            "diff_summary": diff_summary
        }),
        status_code=200,
        mimetype="application/json"
    )
