from osrs.controllers.highscores import Highscores
from osrs.enums import AccountType
from osrs.exceptions import OutdatedError
from unittest import mock

import unittest


class TestHighscores(unittest.TestCase):
    """Test highscores controller"""

    @mock.patch("osrs.controllers.highscores.Highscores._call_highscores_api")
    def test_save_animal(
        self,
        highscores_api_results: mock.MagicMock(),
    ):
        """Test fails when gets incorrect number of rows from response"""
        # Given
        highscores_controller = Highscores(
            username="testerboi", account_type=AccountType.NORMAL
        )
        highscores_api_results.return_value = """
        78153,2088,183952350
        351209,90,5758573
        326501,90,5500929
        385074,96,10655842
        252413,99,15057678
        287967,99,13035913
        238765,80,1994794
        251108,96,10236780
        141722,99,13055260
        64287,99,13056995
        115494,99,13035106
        232526,85,3259941
        81301,99,13071891
        60287,99,13054465
        254175,77,1477243
        93010,88,4502563
        268709,78,1661434
        88517,85,3416470
        58563,99,13038496
        108780,96,10069570
        101710,99,13074937
        174299,73,1036145
        118916,85,3270151
        320246,78,1631174
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        58591,393
        203297,140
        -1,-1
        -1,-1
        114881,108
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        220364,54
        158859,53
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        18648,103
        -1,-1
        144476,142
        78580,1598
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        36994,42
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        116318,58
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        140124,262
        86146,537
        -1,-1
        216533,50
        extra,values
        """

        # When/Then
        with self.assertRaises(OutdatedError):
            highscores_controller.set_user_highscores()
