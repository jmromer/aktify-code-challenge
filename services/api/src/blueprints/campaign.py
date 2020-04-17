import sqlalchemy
from flask import Blueprint, request
from flask.json import jsonify

from src.models import Campaign, db

campaign_blueprint = Blueprint('campaign', __name__, url_prefix='/campaigns')


@campaign_blueprint.route('/', methods=['GET'])
def index():
    campaigns = Campaign.query.all()
    return jsonify([campaign.serialize for campaign in campaigns])


@campaign_blueprint.route('/', methods=['POST'])
def create():
    try:
        campaign = Campaign(**request.get_json())
        db.session.add(campaign)
        db.session.commit()
        return jsonify(campaign.serialize)
    except sqlalchemy.exc.SQLAlchemyError:
        return jsonify({'message': 'Campaign could not be persisted.'}), 422


@campaign_blueprint.route('/<campaign_id>', methods=['GET'])
def get(campaign_id):
    if not campaign_id.isdigit():
        return jsonify({'message': 'id must be an integer'}), 422

    campaign = Campaign.query.get(campaign_id)

    if not campaign:
        return jsonify({'message': 'Campaign not found.'}), 404

    return jsonify(campaign.serialize)
