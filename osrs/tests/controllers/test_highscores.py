from osrs.controllers.highscores import Highscores
from osrs.enums import AccountType
from osrs.exceptions import OutdatedError
from unittest import mock

import unittest


class TestHighscores(unittest.TestCase):
    """Test highscores controller"""

    @mock.patch("osrs.controllers.highscores.Highscores._call_highscores_api")
    def test_fail_retrieve_highscores(
        self,
        highscores_api_results: mock.MagicMock(),
    ):
        """Test fails when gets incorrect number of rows from response"""
        # Given
        highscores_controller = Highscores(
            username="testerboi", account_type=AccountType.NORMAL
        )
        highscores_api_results.return_value = """
        24422,2277,331473717
        """

        # When/Then
        with self.assertRaises(OutdatedError):
            highscores_controller.set_user_highscores()

    @mock.patch("osrs.controllers.highscores.Highscores._call_highscores_api")
    def test_retrieve_highscores(
        self,
        highscores_api_results: mock.MagicMock(),
    ):
        """Test assigns correct number of values for each category"""
        # Given
        highscores_controller = Highscores(
            username="testerboi", account_type=AccountType.NORMAL
        )
        highscores_api_results.return_value = """
        24422,2277,331473717
        144255,99,14230400
        141414,99,13616663
        179532,99,14623865
        108005,99,26423721
        135711,99,19838810
        68613,99,13045942
        113625,99,15053001
        94187,99,13347289
        60900,99,13196891
        85067,99,13080292
        63582,99,13051080
        59250,99,13453411
        10539,99,15041453
        26091,99,13142183
        37171,99,13173166
        28776,99,13157073
        29076,99,13072410
        45498,99,13278850
        45411,99,15226798
        118968,99,13178676
        29871,99,13055861
        29730,99,13146539
        51496,99,13039343
        -1,-1
        -1,-1
        -1,-1
        220018,146
        707900,2
        659554,4
        261326,28
        190291,80
        94437,26
        122116,6
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        56412,308
        41606,922
        226487,155
        69426,9
        65492,50
        140121,128
        -1,-1
        -1,-1
        57541,50
        69719,50
        42938,253
        -1,-1
        93249,50
        94922,203
        125252,224
        92883,212
        28793,50
        87071,256
        176685,50
        38524,251
        28485,106
        81789,82
        133339,189
        74116,2002
        75770,63
        29439,251
        56584,2
        43364,100
        -1,-1
        -1,-1
        136796,5
        76306,53
        22256,150
        18695,58
        6002,438
        18181,62
        23039,221
        -1,-1
        -1,-1
        102276,263
        -1,-1
        -1,-1
        -1,-1
        -1,-1
        70818,52
        21410,76
        159596,283
        110802,552
        44609,150
        198449,160
        """

        # When
        highscores_controller.set_user_highscores()

        # Then
        self.assertEqual(len(highscores_controller.bosses.to_json()), 50)
        self.assertEqual(len(highscores_controller.minigames.to_json()), 14)
        self.assertEqual(len(highscores_controller.skills.to_json()), 23)
