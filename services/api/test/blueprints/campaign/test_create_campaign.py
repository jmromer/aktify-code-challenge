import pytest

from src.models import Campaign


def post_campaign_path():
    return f'/campaigns/'


def test_post_campaign_validation_failure(client):
    response = client.post(post_campaign_path(), json={})
    assert response.status_code == 422
    response = client.post(post_campaign_path(), json={'name': None})
    assert response.status_code == 422
    response = client.post(post_campaign_path(), json={'name': '  '})
    assert response.status_code == 422
    response = client.post(post_campaign_path(), json={'name': ''})
    assert response.status_code == 422


def test_post_campaign_ok(client):
    campaign_attrs = {
        'name': 'Campaign New',
        'description': 'A new campaign.',
        'is_active': True
    }

    response = client.post(post_campaign_path(), json=campaign_attrs)

    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data['name'] == campaign_attrs['name']
    assert json_data['description'] == campaign_attrs['description']
    assert json_data['is_active'] == campaign_attrs['is_active']
