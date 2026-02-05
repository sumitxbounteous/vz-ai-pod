import os
import adal
import requests
import json
import logging

class DynamicsAPI:
    def __init__(self):
        # 🔐 These should be env vars later (keeping as-is for now)
        self.TENANT_ID = "9d343c00-4814-47eb-abcd-e3a0761d628b"
        self.CLIENT_ID = "ac7a4744-0755-4d63-a222-67fc635fdae6"
        self.CLIENT_SECRET = "tJu8Q~3N_hn7wdDcdQLDUDDllEMRVvOkYQs2ccoD"

        self.RESOURCE_URI = "https://org46fe0906.crm.dynamics.com/"
        self.AUTHORITY_URI = f"https://login.microsoftonline.com/{self.TENANT_ID}"
        self.OrganizationURI = f"{self.RESOURCE_URI}api/data/v9.2/"

        self.context = adal.AuthenticationContext(self.AUTHORITY_URI, api_version=None)
        self.access_token = None

        # ✅ Local dev switch
        self.IS_LOCAL = os.getenv("LOCAL_DEV", "true").lower() == "true"

    # ---------------------------
    # AUTH
    # ---------------------------
    def get_access_token(self):
        token = self.context.acquire_token_with_client_credentials(
            self.RESOURCE_URI,
            self.CLIENT_ID,
            self.CLIENT_SECRET
        )
        self.access_token = token.get("accessToken")
        return self.access_token

    def get_request_session(self):
        if not self.access_token:
            self.get_access_token()

        session = requests.Session()
        session.headers.update(
            {
                "Authorization": f"Bearer {self.access_token}",
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        )
        return session

    # ---------------------------
    # D365 DATA METHODS
    # ---------------------------
    def get_quote_activities(self, quote_id):
        """
        Returns last 2 attachments for a quote.
        In LOCAL mode, returns empty safely.
        """
        if self.IS_LOCAL:
            logging.warning("LOCAL_DEV enabled – skipping D365 call")
            return {"value": []}

        query = (
            f"{self.OrganizationURI}"
            "annotations?"
            f"$filter=_objectid_value eq {quote_id} "
            "&$orderby=versionnumber desc"
            "&$top=2"
            "&$select=subject,notetext,mimetype,filename,documentbody"
        )

        session = self.get_request_session()
        response = session.get(query)
        response.raise_for_status()
        return response.json()
